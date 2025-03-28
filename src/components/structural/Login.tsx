import { FormEvent, useRef } from 'react'
import { useLoginStore } from '@/stores/authStore'
import Logo from '@/components/icons/Logo'
import { useMutation } from '@tanstack/react-query'
import { sessionLoginHandler } from '@/handlers/sessionHandlers'
import { useNavigate } from '@tanstack/react-router'
import { toast } from '@/components/ui/use-toast'
import LoaderButtonContent from '@/components/loaders/LoaderButtonContent'

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { setUserData } = useLoginStore()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sessionLoginHandler,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isPending) return
    const userPayload = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    }
    const loginResponse = await mutateAsync(userPayload)
    if (loginResponse) {
      setUserData(loginResponse)
      navigate({ to: '/landing' })
      toast({
        variant: 'success',
        title: 'Ya te encuentras logeado!',
        description: 'Si quieres deslogearte clickea en "Cerrar sesión"',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Email o contraseña equivocada',
        description: 'Intenta nuevamente para ingresar',
      })
    }
  }

  return (
    <div className="balansaas-gradient relative grid min-h-svh min-w-full place-items-center">
      <main className="card-border w-[380px] rounded-md border-2 border-slate-700 bg-white/95 px-8 py-6">
        <article className="mb-3 grid place-items-center">
          <div className="max-w-64">
            <Logo />
          </div>
        </article>
        <form onSubmit={handleSubmit}>
          <article>
            <section className="form-field">
              <label className="label-field">Email</label>
              <input
                ref={emailRef}
                className="input-field"
                type="email"
                placeholder="balansaas@gmail.com"
              ></input>
            </section>
            <section className="form-field">
              <label className="label-field">Contraseña</label>
              <input
                ref={passwordRef}
                className="input-field"
                type="password"
                placeholder="••••••••••••"
              ></input>
            </section>
            <section className="form-field">
              <button className="btn w-full" disabled={isPending}>
                {isPending ? <LoaderButtonContent /> : 'Ingresar'}
              </button>
            </section>
          </article>
        </form>
      </main>
    </div>
  )
}

export default Login
