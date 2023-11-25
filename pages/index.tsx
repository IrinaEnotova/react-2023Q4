import Details from '../components/Details/Details';
import ItemsLayout from '../components/Layouts/ItemsLayout/ItemsLayout';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
  const router = useRouter();
  const searchParams = router.query['character'];

  return <ItemsLayout>{searchParams ? <Details /> : <></>}</ItemsLayout>;
}

export async function getServerSideProps(): Promise<{ redirect: { destination: string; permanent: boolean } }> {
  return {
    redirect: {
      destination: '/page/1?search=&limit=12',
      permanent: false,
    },
  };
}
