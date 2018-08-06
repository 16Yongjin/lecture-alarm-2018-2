const rp = require('request-promise')

const uri = 'https://fcm.googleapis.com/fcm/send'
const Authorization = 'key=AAAAF0fPUwk:APA91bGP8nfVgRPNlDMAlWp49b2OyJch2sVfIWYGdbTQ0QFDVmoOpzLuXRvAT9DuhMGxFcmgmcu2qQQEUUNSCpwWWV8GV_AsDTD8iABjWSz1kZ1mJRsS9iwODl7TR3j1ddIejTaQ8D_v'

const send = (to, title, body) =>
  rp({
    method: 'POST',
    uri,
    headers: { Authorization },
    body: {
      to,
      notification: { title, body, icon: '/noti-icon.png' }
    },
    json: true
  })

// send('davUGiAAuJ8:APA91bF-9iWbALWP8TB0WV5V7dpS_F163IWS8TVueB0LMeo64PpYpnEVtuaqMRv1ZxIySL6hYtOSI4-Ci1Vpz_Am4fqg7iGmj2z6X2VzK0FeilOt3Nf0K9S-At0gcjhgKFaqOLlp1AXD','hello', 'hi').then(console.log)
module.exports = send