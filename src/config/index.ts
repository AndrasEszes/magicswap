import { isProduction } from '@/lib/environment'

import production from '@/config/production'
import development from '@/config/development'

export default isProduction() ? production : development
