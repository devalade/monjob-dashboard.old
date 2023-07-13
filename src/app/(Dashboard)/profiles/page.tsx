import { getSession } from '@/app/supabase-server';
import { getUserCompany, getUserProfile } from '../queries';
import { CompanyInformationForm } from './components/company-information-form';
import { PersonalInformationForm } from './components/personal-information-form';
import FormSection from './components/form-section';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { AlertCircle } from 'lucide-react';

export default async function SettingsProfilePage() {
  const session = await getSession();
  const profile = await getUserProfile(session?.user);
  const company = await getUserCompany(session?.user);

  return (
    <div className='space-y-6 h-full max-w-lg w-full'>
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription className='text-sm'>
          Veuillez bien renseigner les informations par rapport à votre
          entreprise.
        </AlertDescription>
      </Alert>
      <FormSection
        title='Information  personnelle'
        description='Vous pouvez apporter des modifications à vos informations personnelles.'>
        <PersonalInformationForm profile={profile} />
      </FormSection>
      <FormSection
        title='Entreprise'
        description='Vous pouvez apporter des 
        modifications aux informations de votre entreprise.'>
        <CompanyInformationForm company={company} />
      </FormSection>
    </div>
  );
}
