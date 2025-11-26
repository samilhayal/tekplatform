// Firebase Admin SDK Configuration (for server-side/API operations)
import * as admin from 'firebase-admin'

// Private key doğrudan buraya yazıyoruz (environment variable sorunlarından kaçınmak için)
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyyKBxB7ssFsZf
ly2BbqwleNUVN+Pdtd/7zxeTEbj8eQJaixNL6g19c85sPFUnM3+atT8py66WWgyq
v+JEbB884F4huJcSkQVtJO8a3hU/hLPF5NDoI9de33iiCZxSgklZmGzEzlBxX/AI
AVXwjMZwB69USCxAnDCsJGTERgWMcGgx9TUHqzWs17CsSWFkS6j21PhLmhK+FsKa
3OkLi2e7WV2Jmriwy2wanRAfD1zI9jI9mX/BldZ0T6nVRAjv45N8K5NMJtnQiW0P
o+0zeb7I2NHlX7FDwW3Id1BXKDB/jccO+UPWxYxlO6zMriHIYuBxzbuPuWlFIgwL
g7PIlH6zAgMBAAECggEAKVC1ywkXVwv4UdTU3kleHNa8n0eoL+880Ks97m21CxtH
0Pa8wdlXvrsJY/fZUdLT1UO3UghQ00wCC1+GgXtfCKls92v59X9v+pYDb3kM/f3D
saK8KDlIJxOLhB6mcmbLXpob4Ksw6dJa3O66Fnnhzbfo65g2KcQud0l9w+HOnHJl
oOw9ox4jDSJDFp/NTkDPMPXKv0MGJ+D+s/TEf6fsjYU40pBL0lIheITcAKos3UZA
pkEIHxcsyMu1TH8vNtY1BjR4Qx67jCAfmDS3zo0VDR0airWhQnEKqaADL1PmVsjA
7u0bh624jXDloZb9Hmgh2sJU5rp/OAPiG2USPrEiIQKBgQD3rNXl34/5rp+bEFUs
SSsgI9p7L/U+9v8LeUu+uFNToXrZp5N2hIOYXrtB1YTC4L4duh8PCbz6/mfoBaRE
UG/wLepJ35eDFQBQviZMXa9giaw+SLQdxA9TWQsVOXqa5HxXG4K8AgTd7w1uYILo
lNp7I3P1n+aDz6MJ6iDEVCnCkQKBgQC4ywCrx8/xv9LlzwVDl1SSdoA/zIYFvtML
YLoDScv6hNY+YVvRq9mwXH3HxUmIFV2fosWJAY6nbswvrcaMjep4YZ4pkX5foEaz
0RaV8eK3MD70zxb65Rfkmp26FmiBoaRU3Em2WjvIugF/6hrID6BCO839KKVXyLWN
mDajU5FHAwKBgQCredBF7PjDh3EdbLtrg+UFxYz4iQWk6GFAUmRs0TVvy3dAxlLE
VY6+qafANtJKEkvOTRQ/1yAuLoFGFNHcMkyt3zw8lT9TE/E59cySRrKrheXo4XFC
woFR1W5k7XzDTLoBnRxwin1QIrgL2WoJGTYC11Lrlh+E1vcsYBr7ksGu4QKBgF+O
UbWCaGwJFmRRbdZqzYfDEURsXS1hZL5wcR+8LGdKA4NUUueUJshEu6Huybw92CDx
SZY0IPFBoQJSqOYLiKBhUikKnD+UoJrhVv2IjATQRO3QnIB2sKk8rq0IY1gNHu3m
z5MlC98bGCVuCBVFx0gYpsbvGrjPB9rFSBOi5e/DAoGACMyK7QC3ZC6o7Mg1Je1h
7YQQUM5aSHh7yPg0QxcgXxtUFOUzjQoxhXlC9X7a60SwHHyn+20T+WGvm63Yoif3
N6pm8GREpBx8N7EabU3JXDsvy9UwERTYmYfSwBFqzlwIrUl0nQuWVuwbC+CRZeVx
xes6WeDPxsL5kta8y4Z4jkk=
-----END PRIVATE KEY-----`

const serviceAccount = {
  type: 'service_account',
  project_id: 'tekplatform-12ade',
  private_key_id: '8c4d26aee41a9c2626cddf8892e4e14fa0f3c30e',
  private_key: privateKey,
  client_email: 'firebase-adminsdk-fbsvc@tekplatform-12ade.iam.gserviceaccount.com',
  client_id: '100581260740064423049',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tekplatform-12ade.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      projectId: 'tekplatform-12ade'
    })
    console.log('✅ Firebase Admin initialized successfully')
  } catch (error) {
    console.error('❌ Firebase admin initialization error:', error)
  }
}

const adminDb = admin.firestore()

export { adminDb, admin }
