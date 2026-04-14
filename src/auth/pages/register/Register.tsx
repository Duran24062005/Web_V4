import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { getErrorMessage } from '../../../lib/http';
import { persistSession } from '../../../lib/session';
import { CustomLogo } from '../../../shared/custom/CustomLogo';
import { register } from '../../../services/auth/auth.service';

export const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

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
      });

      persistSession({
        token: payload.token,
        firstName: payload.user.first_name,
        lastName: payload.user.last_name,
      });

      toast.success('Registro completado. La cuenta se creó con estado pendiente.');
      navigate('/privated-zone');
    } catch (error) {
      const message = getErrorMessage(error, 'No fue posible completar el registro.');
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen flex justify-center items-center pt-20 pb-10">
      <div className="flex flex-col gap-6 w-full max-w-5xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <CustomLogo />
                  <p className="text-balance text-muted-foreground">
                    Crea una cuenta para acceder a tu zona privada.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">Nombre</Label>
                    <Input id="first_name" name="first_name" type="text" placeholder="Nombre" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Apellido</Label>
                    <Input id="last_name" name="last_name" type="text" placeholder="Apellido" required />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input id="email" name="email" type="email" placeholder="mail@google.com" required />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                    <Input id="birthdate" name="birthdate" type="date" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="document_number">Documento</Label>
                    <Input
                      id="document_number"
                      name="document_number"
                      type="text"
                      placeholder="Número de documento"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="requested_role">Rol solicitado</Label>
                  <select
                    id="requested_role"
                    name="requested_role"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="student"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="guardian">Guardian</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" name="password" type="password" placeholder="Contraseña" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password_confirm">Confirmar contraseña</Label>
                    <Input
                      id="password_confirm"
                      name="password_confirm"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      required
                    />
                  </div>
                </div>

                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
                </Button>

                <div className="text-center text-sm">
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/login" className="underline underline-offset-4">
                    Ingresa ahora
                  </Link>
                </div>
              </div>
            </form>

            <div className="relative hidden bg-muted md:block">
              <img
                src="https://raw.githubusercontent.com/Duran24062005/educonnect-nextjs-fastapi/refs/heads/main/public/assets/img/Fondo2.jpg"
                alt="Register background"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Haciendo click, estás de acuerdo con <a href="#">términos y condiciones</a> y{' '}
          <a href="#">políticas de uso</a>.
        </div>
      </div>
    </div>
  );
};
