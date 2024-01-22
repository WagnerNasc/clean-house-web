import { Controller, useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { X, User } from 'phosphor-react';
import { CloseButton, Content, Overlay, Title } from './styles';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { isValidEmail } from '../../utils/emailValidator';
import { CustomersContext } from '../../contexts/CustomerContext';
import { useContext } from 'react';

const createCustomerFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type CreateCustomerFormInputs = z.infer<typeof createCustomerFormSchema>

export function CreateCustomerAddress({ afterSave }: { afterSave: () => void }) {
  const { createCustomer  } = useContext(CustomersContext);
  
  const { 
    register, 
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<CreateCustomerFormInputs>({
    resolver: zodResolver(createCustomerFormSchema)
  });

  const handleCreateCustomer = async (data: CreateCustomerFormInputs) => {
    const { name, email, phone, street, number, neighborhood, city, state, postalCode, latitude, longitude } = data;

    await createCustomer({
      name, email, phone, street, number, neighborhood, city, state, postalCode, latitude, longitude
    })
    reset();
    afterSave();
  }

  return (
    <Dialog.Portal>
        <Overlay/>
        <Content>
          <Title>
            <User size={24}/> Criar cliente
          </Title>
          <CloseButton>
            <X size={24}/>
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateCustomer)}>
            <input 
              type="text" 
              placeholder='Nome' 
              {...register('name')}
            />
            {errors.name && errors.name.type === 'required' && <span>Nome é obrigatório</span>}
 
            <Controller
              render={({ field }) => (
                <input 
                  type="text" 
                  placeholder='Email'
                  {...field} 
                  onChange={(e) => field.onChange(e.target.value)} 
                  onBlur={() => isValidEmail(field.value)} 
                />
              )}
              name="email"
              control={control}
              rules={{ required: true, validate: isValidEmail }}
            />
            {errors.email && errors.email.type === 'required' && <span>Email é obrigatório</span>}
            {errors.email && errors.email.type === 'validate' && <span>Email inválido</span>}


            <input 
              type="text" 
              placeholder='Telefone'
              {...register('phone', 
              { required: true })} 
            />
            {errors.phone && <span>Telefone é obrigatório</span>}

            <input 
              type="text" 
              placeholder='Logradouro' 
              {...register('street', 
              { required: true })} />
            {errors.street && <span>Logradouro é obrigatório</span>}

            <input 
              type="text" 
              placeholder='Numero' 
              {...register('number', 
              { required: true })} 
            />
            {errors.number && <span>Número é obrigatório</span>}

            <input 
              type="text" 
              placeholder='Bairro' 
              {...register('neighborhood', 
              { required: true })} 
            />
            {errors.neighborhood && <span>Bairro é obrigatório</span>}

            <input 
              type="text" 
              placeholder='Cidade' 
              {...register('city', 
              { required: true })} 
            />
            {errors.city && <span>Cidade é obrigatória</span>}

            <input 
              type="text" 
              placeholder='Estado' 
              {...register('state', 
              { required: true })} 
            />
            {errors.state && <span>Estado é obrigatória</span>}

            <input 
              type="text" 
              placeholder='CEP' 
              {...register('postalCode', 
              { required: true })} 
            />
            {errors.postalCode && <span>CEP é obrigatória</span>}

            <input 
              type="text" 
              placeholder='Latitude' 
              {...register('latitude', 
              { valueAsNumber: true, required: true })} 
            />
            {errors.latitude && <span>Latitude deve ser um número válido</span>}

            <input 
              type="text" 
              placeholder='Longitude' 
              {...register('longitude', 
              { valueAsNumber: true, required: true })} 
            />
            {errors.longitude && <span>Longitude deve ser um número válido</span>}

            <button type="submit" disabled={isSubmitting}>
                Criar
            </button>
          </form>
        </Content>
    </Dialog.Portal>
  );
}