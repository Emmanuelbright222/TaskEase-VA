import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = request.body as {
    name: string;
    email: string;
    company?: string;
    message: string;
  };

  if (!name || !email || !message) {
    return response.status(422).json({ error: 'Missing fields' });
  }

  if (!process.env.CONTACT_FORWARD_TO) {
    return response.status(500).json({ error: 'CONTACT_FORWARD_TO not configured' });
  }

  try {
    const { error } = await supabase.from('contact_messages').insert({ name, email, company, message });
    if (error) {
      throw error;
    }

    await resend.emails.send({
      from: 'TaskEase <hello@taskeaseva.com>',
      to: process.env.CONTACT_FORWARD_TO as string,
      subject: 'New TaskEase VA inquiry',
      html: `<p><strong>${name}</strong> (${email}) reached out.</p><p>${company ?? 'No company supplied'}</p><p>${message}</p>`
    });

    return response.status(200).json({ status: 'ok' });
  } catch (error: any) {
    console.error('Contact handler error', error);
    return response.status(500).json({ error: 'Unable to send message' });
  }
}
