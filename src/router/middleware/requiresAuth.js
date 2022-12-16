import { sharedService } from '@/service/AppSharedService'

export default function requiresAuth ({ to, from, next }) {
  if (sharedService.IsSignedIn() === false) {
    customEvents(to, from, next)
    next({ name: 'SignIn' })
  } else {
    customEvents(to, from, next)
    next() 
  }
}

function customEvents (to, from, next) {
  if (to.name === 'SignIn' || to.name === 'SignUp') {
    sharedService.HideAppBar = true
  } else {
    sharedService.HideAppBar = false
  }
}