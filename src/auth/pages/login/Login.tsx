import { useState, type FormEvent } from 'react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui//card'
import { Input } from '../../../components/ui//input'
import { Label } from '../../../components/ui//label'
import { loginAction } from '../../../actions/login.action'
import { toast } from 'sonner'
import { getErrorMessage } from '../../../lib/http'
import { persistSession } from '../../../lib/session'
import { CustomLogo } from '../../../shared/custom/CustomLogo'
import { useLanguage } from '../../../i18n/LanguageContext'
import { LocalizedLink } from '../../../i18n/LocalizedLink'
import { getCopy } from '../../../i18n/copy'
import { useNavigate } from 'react-router-dom'
import { buildLocalizedPath } from '../../../i18n/utils'

export const Login = () => {
  const navigate = useNavigate()
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { language } = useLanguage()
  const copy = getCopy(language)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPosting(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    setErrorMessage(null)

    try {
      const data = await loginAction(email, password)
      if (data.token) {
        persistSession({
          token: data.token,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
        })
        navigate(buildLocalizedPath(language, '/privated-zone'))
      }
    } catch (error) {
      const message = getErrorMessage(error, copy.auth.invalidCredentials)
      toast.error(message)
      setErrorMessage(message)
    }

    setIsPosting(false)
  }

  return (
    <div className="flex w-screen items-center justify-center pt-50">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={(event) => handleLogin(event)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <CustomLogo subtitle={copy.auth.website} />

                  <p className="text-balance text-muted-foreground">{copy.auth.loginIntro}</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.auth.email}</Label>
                  <Input id="email" type="email" name="email" placeholder="mail@google.com" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{copy.auth.password}</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                      {copy.auth.forgotPassword}
                    </a>
                  </div>
                  <Input id="password" type="password" name="password" required placeholder={copy.auth.password} />
                </div>
                {errorMessage ? (
                  <div className="flex justify-center bg-slate-300">
                    <p className="text-red-500">{errorMessage}</p>
                  </div>
                ) : null}
                <Button type="submit" className="w-full bg-slate-300 hover:bg-slate-100" disabled={isPosting}>
                  {copy.auth.login}
                </Button>
                <div className="text-center text-sm">
                  {copy.auth.noAccount}{' '}
                  <LocalizedLink to="/register" className="underline underline-offset-4">
                    {copy.auth.createOne}
                  </LocalizedLink>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://raw.githubusercontent.com/Duran24062005/educonnect-nextjs-fastapi/refs/heads/main/public/assets/img/Fondo2.jpg"
                alt={copy.auth.loginBackgroundAlt}
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          {copy.auth.loginTerms} <a href="#">{copy.auth.terms}</a> {language === 'es' ? 'y' : 'and'}{' '}
          <a href="#">{copy.auth.policies}</a>.
        </div>
      </div>
    </div>
  )
}
