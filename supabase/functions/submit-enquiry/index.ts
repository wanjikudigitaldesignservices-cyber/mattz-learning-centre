import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const enquirySchema = z.object({
  parent_name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional().or(z.literal("")),
  child_grade: z.string().min(1),
  program: z.string().min(1),
  preferred_start: z.string().optional(),
  message: z.string().max(1000).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limiting check
    const { data: rateLimit, error: fetchError } = await supabaseClient
      .from("rate_limits")
      .select("*")
      .eq("ip_address", clientIp)
      .single();

    const now = new Date();
    if (rateLimit) {
      const lastSubmission = new Date(rateLimit.last_submission);
      const hoursSinceLast = (now.getTime() - lastSubmission.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLast < 1) {
        if (rateLimit.submission_count >= 5) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429,
          });
        }
        await supabaseClient
          .from("rate_limits")
          .update({ submission_count: rateLimit.submission_count + 1, last_submission: now.toISOString() })
          .eq("ip_address", clientIp);
      } else {
        await supabaseClient
          .from("rate_limits")
          .update({ submission_count: 1, last_submission: now.toISOString() })
          .eq("ip_address", clientIp);
      }
    } else {
      await supabaseClient
        .from("rate_limits")
        .insert({ ip_address: clientIp, submission_count: 1, last_submission: now.toISOString() });
    }

    // Validate payload
    const body = await req.json();
    const validatedData = enquirySchema.parse(body);

    // Insert into DB
    const { data: enquiry, error: insertError } = await supabaseClient
      .from("enquiries")
      .insert(validatedData)
      .select()
      .single();

    if (insertError) throw insertError;

    // Invoke notify-admin function asynchronously
    supabaseClient.functions.invoke("notify-admin", {
      body: { enquiry },
    }).catch(console.error);

    return new Response(JSON.stringify({ success: true, enquiry }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
