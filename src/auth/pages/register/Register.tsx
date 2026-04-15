import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { getErrorMessage } from '../../../lib/http'
import { persistSession } from '../../../lib/session'
import { CustomLogo } from '../../../shared/custom/CustomLogo'
import { register } from '../../../services/auth/auth.service'
import { useLanguage } from '../../../i18n/LanguageContext'
import { getCopy } from '../../../i18n/copy'
import { LocalizedLink } from '../../../i18n/LocalizedLink'
import { useNavigate } from 'react-router-dom'
import { buildLocalizedPath } from '../../../i18n/utils'

export const Register = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { language } = useLanguage()
  const copy = getCopy(language)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      const payload = await register({
        first_name: String(formData.get('first_name') || ''),
        last_name: String(formData.get('last_name') || ''),
        email: String(formData.get('email') || ''),
        birthdate: String(formData.get('birthdate') || ''),
        document_number: String(formData.get('document_number') || ''),
        password: String(formData.get('password') || ''),
        password_confirm: String(formData.get('password_confirm') || ''),
        requested_role: String(formData.get('requested_role') || 'student'),
      })

      persistSession({
        token: payload.token,
        firstName: payload.user.first_name,
        lastName: payload.user.last_name,
      })

      toast.success(copy.auth.accountCreated)
      navigate(buildLocalizedPath(language, '/privated-zone'))
    } catch (error) {
      const message = getErrorMessage(error, copy.auth.registerError)
      setErrorMessage(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-screen items-center justify-center pb-10 pt-20">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <CustomLogo subtitle={copy.auth.website} />
                  <p className="text-balance text-muted-foreground">{copy.auth.registerIntro}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">{copy.auth.firstName}</Label>
                    <Input id="first_name" name="first_name" type="text" placeholder={copy.auth.firstName} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">{copy.auth.lastName}</Label>
                    <Input id="last_name" name="last_name" type="text" placeholder={copy.auth.lastName} required />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.auth.email}</Label>
                  <Input id="email" name="email" type="email" placeholder="mail@google.com" required />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="birthdate">{copy.auth.birthdate}</Label>
                    <Input id="birthdate" name="birthdate" type="date" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="document_number">{copy.auth.documentNumber}</Label>
                    <Input
                      id="document_number"
                      name="document_number"
                      type="text"
                      placeholder={copy.auth.placeholderDocument}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="requested_role">{copy.auth.roleRequested}</Label>
                  <select
                    id="requested_role"
                    name="requested_role"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="student"
                  >
                    <option value="student">{copy.auth.roleStudent}</option>
                    <option value="teacher">{copy.auth.roleTeacher}</option>
                    <option value="guardian">{copy.auth.roleGuardian}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="password">{copy.auth.password}</Label>
                    <Input id="password" name="password" type="password" placeholder={copy.auth.password} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password_confirm">{copy.auth.passwordConfirm}</Label>
                    <Input
                      id="password_confirm"
                      name="password_confirm"
                      type="password"
                      placeholder={copy.auth.confirmPassword}
                      required
                    />
                  </div>
                </div>

                {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? copy.auth.creatingAccount : copy.auth.createAccount}
                </Button>

                <div className="text-center text-sm">
                  {copy.auth.alreadyHaveAccount}{' '}
                  <LocalizedLink to="/login" className="underline underline-offset-4">
                    {copy.auth.loginNow}
                  </LocalizedLink>
                </div>
              </div>
            </form>

            <div className="relative hidden bg-muted md:block">
              <img
                src="https://raw.githubusercontent.com/Duran24062005/educonnect-nextjs-fastapi/refs/heads/main/public/assets/img/Fondo2.jpg"
                alt={copy.auth.registerBackgroundAlt}
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
