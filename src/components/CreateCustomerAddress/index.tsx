import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { X, User } from 'phosphor-react';
import { CloseButton, Content, Overlay, Title } from './styles';
import { isValidEmail } from '../../utils/emailValidator';
import { toast } from 'react-toastify';


interface CustomerAddressFormData {
  name: string
  email: string
  phone: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  latitude: number
  longitude: number
}

export function CreateCustomerAddress() {
  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<CustomerAddressFormData>(); 

  const onSubmit: SubmitHandler<CustomerAddressFormData> = async (data) => {
    try {
      await fetch("http://localhost:3000/customer-address", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      reset();

      handleCloseModal();
      toast.success("Cliente criado com sucesso!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("Erro ao criar cliente. Tente novamente.");
    }
  };

  const handleCloseModal = () => {
    console.log('teste');
    
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Title>
          <User size={24}/> Criar cliente
        </Title>
        <CloseButton>
          <X size={24}/>
        </CloseButton>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder='Nome' {...register('name', { required: true })} />
          {errors.name && <span>Nome é obrigatório</span>}

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
          {errors.city && <span>Estado é obrigatória</span>}

          <input 
            type="text" 
            placeholder='CEP' 
            {...register('postalCode', 
            { required: true })} 
          />
          {errors.city && <span>CEP é obrigatória</span>}

          <input 
            type="text" 
            placeholder='Latitude' 
            {...register('latitude', 
            { pattern: /^-?\d+(\.\d+)?$/, required: true })} 
          />
          {errors.city && <span>Latitude deve ser um número válido</span>}

          <input 
            type="text" 
            placeholder='Longitude' 
            {...register('longitude', 
            { pattern: /^-?\d+(\.\d+)?$/, required: true })} 
          />
          {errors.city && <span>Longitude deve ser um número válido</span>}

          <button type="submit" disabled={isSubmitting}>Criar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}