import { useState, useEffect } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Download, LogOut } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "http://localhost:54321";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchEnquiries();
    }
  }, [session, statusFilter]);

  async function fetchEnquiries() {
    let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching enquiries:", error);
    } else {
      setEnquiries(data || []);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAuthError(error.message);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  async function updateStatus(id: string, newStatus: string) {
    const updateData: any = { status: newStatus };
    if (newStatus === "contacted") {
      updateData.contacted_at = new Date().toISOString();
    }
    const { error } = await supabase
      .from("enquiries")
      .update(updateData)
      .eq("id", id);
    
    if (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } else {
      fetchEnquiries();
    }
  }

  function exportCSV() {
    if (enquiries.length === 0) return;
    const headers = ["Date", "Parent Name", "Phone", "Email", "Grade", "Program", "Status"];
    const csvRows = [headers.join(",")];

    for (const enq of enquiries) {
      const values = [
        format(new Date(enq.created_at), "yyyy-MM-dd"),
        `"${enq.parent_name}"`,
        `"${enq.phone}"`,
        `"${enq.email || ""}"`,
        `"${enq.child_grade}"`,
        `"${enq.program}"`,
        enq.status,
      ];
      csvRows.push(values.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `enquiries_${format(new Date(), "yyyyMMdd")}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-slate-200">
          <h1 className="text-2xl font-bold text-center text-indigo-950 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{authError}</div>}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800">Sign In</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-950">Enquiries Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-600">Filter Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={exportCSV} className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-semibold">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Phone / Email</TableHead>
                  <TableHead>Grade & Program</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No enquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  enquiries.map((enq) => (
                    <TableRow key={enq.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(enq.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium">{enq.parent_name}</TableCell>
                      <TableCell>
                        <a href={`tel:${enq.phone}`} className="text-indigo-600 hover:underline block">{enq.phone}</a>
                        <a href={`mailto:${enq.email}`} className="text-slate-500 text-sm hover:underline">{enq.email}</a>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{enq.child_grade}</div>
                        <div className="text-sm text-slate-500">{enq.program}</div>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate" title={enq.message}>
                        {enq.message || "-"}
                      </TableCell>
                      <TableCell>
                        <Select value={enq.status} onValueChange={(val: string) => updateStatus(enq.id, val)}>
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="enrolled">Enrolled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
