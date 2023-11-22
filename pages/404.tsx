import NotFound from '@/components/NotFound/NotFound';
import MainLayout from '@/components/Layouts/MainLayout/MainLayout';

export default function PageNotFound(): JSX.Element {
  return (
    <MainLayout>
      <NotFound>
        Page was not found <br /> Enter correct URL
      </NotFound>
    </MainLayout>
  );
}
