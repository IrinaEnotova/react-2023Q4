import NotFound from '@/components/NotFound/NotFound';
import MainLayout from '@/components/Layouts/MainLayout/MainLayout';
import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function PageNotFound(): JSX.Element {
  return (
    <MainLayout>
      <NotFound>
        Page was not found <br /> Enter correct URL <br />
        <br />
        <Button>
          <Link href="/page/1?search=&limit=12">or to main page</Link>
        </Button>
      </NotFound>
    </MainLayout>
  );
}
