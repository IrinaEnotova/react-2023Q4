import Details from '@/components/Details/Details';
import ItemsLayout from '@/components/Layouts/ItemsLayout/ItemsLayout';
import { useRouter } from 'next/router';

const CurrentPage = (): JSX.Element => {
  const router = useRouter();
  const searchParams = router.query['character'];

  return <ItemsLayout>{searchParams ? <Details /> : <></>}</ItemsLayout>;
};

export default CurrentPage;
