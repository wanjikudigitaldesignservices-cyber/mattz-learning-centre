import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  try {
    const { enquiry } = await req.json();
    
    console.log("Sending email notification for enquiry:", enquiry.id);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping email notification.");
      return new Response(JSON.stringify({ success: true, simulated: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mattz Learning Centre <onboarding@resend.dev>",
        to: "admin@mattzlearning.local", // Replace with real admin email
        subject: `New Enquiry from ${enquiry.parent_name}`,
        html: `
          <h2>New Website Enquiry</h2>
          <p><strong>Parent Name:</strong> ${enquiry.parent_name}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Email:</strong> ${enquiry.email || "N/A"}</p>
          <p><strong>Grade:</strong> ${enquiry.child_grade}</p>
          <p><strong>Program:</strong> ${enquiry.program}</p>
          <p><strong>Preferred Start:</strong> ${enquiry.preferred_start || "N/A"}</p>
          <p><strong>Message:</strong> ${enquiry.message || "N/A"}</p>
        `,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: res.ok ? 200 : 400,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
