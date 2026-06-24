import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryFormValues } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "http://localhost:54321";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZmF1bHQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4NjY2MDAyMiwiZXhwIjoxOTAyMjM2MDIyfQ.N-L...";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      parent_name: "",
      phone: "",
      email: "",
      child_grade: "",
      program: "",
      preferred_start: "",
      message: "",
    },
  });

  async function onSubmit(data: EnquiryFormValues) {
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-enquiry", {
        body: data,
      });

      if (error || result?.error) {
        throw new Error(error?.message || result?.error || "An error occurred");
      }

      setSuccess(true);
      form.reset();

      // Open WhatsApp deep link
      const text = `Hi, I just submitted an enquiry for ${data.child_grade} — ${data.parent_name}`;
      window.open(`https://wa.me/254721458456?text=${encodeURIComponent(text)}`, "_blank");

    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 text-green-900 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Thank you for your enquiry!</h3>
        <p className="mb-4">We've received your details and will be in touch shortly.</p>
        <p className="text-sm">If WhatsApp didn't open automatically, you can <a href="https://wa.me/254721458456" className="underline font-medium" target="_blank" rel="noreferrer">click here to chat with us</a>.</p>
        <Button className="mt-6" variant="outline" onClick={() => setSuccess(false)}>Submit Another Enquiry</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {errorMsg && (
          <div className="bg-red-50 text-red-900 p-3 rounded-md text-sm">
            {errorMsg}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="parent_name"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Parent/Guardian Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="07xx xxx xxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="child_grade"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Child's Grade *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Grade 1">Grade 1</SelectItem>
                    <SelectItem value="Grade 2">Grade 2</SelectItem>
                    <SelectItem value="Grade 3">Grade 3</SelectItem>
                    <SelectItem value="Grade 4">Grade 4</SelectItem>
                    <SelectItem value="Grade 5">Grade 5</SelectItem>
                    <SelectItem value="Grade 6">Grade 6</SelectItem>
                    <SelectItem value="Grade 7 (JSS)">Grade 7 (JSS)</SelectItem>
                    <SelectItem value="Grade 8 (JSS)">Grade 8 (JSS)</SelectItem>
                    <SelectItem value="Grade 9 (JSS)">Grade 9 (JSS)</SelectItem>
                    <SelectItem value="Senior School">Senior School</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="program"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Program of Interest *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Primary Tuition">Primary Tuition</SelectItem>
                    <SelectItem value="Junior School (CBC)">Junior School (CBC)</SelectItem>
                    <SelectItem value="Senior School">Senior School</SelectItem>
                    <SelectItem value="School-Holiday Tuition">School-Holiday Tuition</SelectItem>
                    <SelectItem value="Exam Prep & Remedial">Exam Prep & Remedial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any specific needs or questions?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a bit about your child's academic needs..." 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Book Free Assessment"}
        </Button>
      </form>
    </Form>
  );
}
