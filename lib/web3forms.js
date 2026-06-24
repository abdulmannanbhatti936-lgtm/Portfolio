const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '818ebb16-641a-4a23-85c9-3e2d86ec4e4e'

export async function submitToWeb3Forms(formElement) {
  const source = new FormData(formElement)

  const payload = new FormData()
  payload.append('access_key', ACCESS_KEY)
  payload.append('name', source.get('user_name') || source.get('name') || '')
  payload.append('email', source.get('user_email') || source.get('email') || '')
  payload.append('message', source.get('message') || '')

  const subject = source.get('subject')
  if (subject) payload.append('subject', subject)

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    body: payload,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Submission failed')
  }

  return data
}
