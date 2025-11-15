export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function sendContactMessage(payload: ContactPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Unable to submit contact form at the moment.');
  }

  return response.json();
}
