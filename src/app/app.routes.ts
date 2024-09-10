import { Routes } from '@angular/router';




export const routes: Routes = [



    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children:[
            {
                path:'home',

                loadComponent: () =>  import('./dashboard/pages/control-flow/control-flow.component')
            },
            {
                path:'propietarios',

                loadComponent: () =>  import('./dashboard/pages/defer-options/defer-options.component')
            },

            {
                path:'user',

                loadComponent: () =>  import('./dashboard/pages/user/user.component')
            },
            {
              path:'ciudades',

              loadComponent: () =>  import('./dashboard/pages/ciudades/ciudades.component').then(m => m.CiudadesComponent)
          },

            {
              path: 'create', // Ensure this is correctly configured
              loadComponent: () => import('./dashboard/pages/view-transition/view-transition.component')
            },
            {
              path: 'create-agente',
              loadComponent: () => import('./dashboard/pages/create-agente/create-agente.component').then(m => m.CreateAgenteComponent)
            },

            {
              path: 'update/:id',
              loadComponent: () => import('./dashboard/pages/update-persona/update-persona.component')
            },
            {
              path: 'update-propietario/:id',
              loadComponent: () => import('./dashboard/pages/update-propietario/update-propietario.component').then(m => m.UpdatePropietarioComponent)
            },
            {
                path:'user-list',

                loadComponent: () =>  import('./dashboard/pages/users/users.component')
            },
            {
              path:'pacientes',

              loadComponent: () =>  import('./dashboard/pages/pacientes/pacientes.component').then(m => m.PacientesComponent)
          },
          {
            path: 'create-paciente',
            loadComponent: () => import('./dashboard/pages/create-paciente/create-paciente.component').then(m => m.CreatePacienteComponent)
          },
          {
            path: 'update-paciente/:id',
            loadComponent: () => import('./dashboard/pages/update-paciente/update-paciente.component').then(m => m.UpdatePacienteComponent)
          },


            {
                path: '',
                redirectTo:'home',
                 pathMatch: 'full',
            }

        ]
    },
    {
      path: "logout",
      loadComponent:() => import('./dashboard/pages/login/login.component').then(m => m.LoginComponent)
    },
    // {
    //   path: 'dashboard',
    //   canActivate: [authGuard],
    //   loadChildren: () => import('./dashboard/dashboard.component')
    // },




{
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
},
{
  path: "login",
  loadComponent:() => import('./dashboard/pages/login/login.component').then(m => m.LoginComponent)
},


];

