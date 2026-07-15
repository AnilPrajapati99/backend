import { Resend } from "resend";

export async function SendEmail({ from, to, subject, html }) {
  const resend = new Resend(process.env.RESEND_API);
  const { data, error } = await resend.emails.send({ from, to, subject, html });

  if (error) throw new Error(error.message); // surface failures to the caller
  return data;
}
