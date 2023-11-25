import { ACCESS_KEY } from '@/API/constants';
import Details from '@/components/Details/Details';
import ItemsLayout from '@/components/Layouts/ItemsLayout/ItemsLayout';
import { ItemsResponse } from '@/interfaces/interfaces';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.params?.pageId;
  const searchQuery = context.query.search ? context.query.search : '';
  const limit = context.query.limit ? context.query.limit : '12';
  const res = await fetch(
    `https://the-one-api.dev/v2/character/?name=%2F${searchQuery}%2Fi&page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${ACCESS_KEY}` },
    }
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

const CurrentPage = ({ data }: { data: ItemsResponse }): JSX.Element => {
  const router = useRouter();
  const searchParams = router.query['character'];

  return (
    <>
      <p>{JSON.stringify(data)}</p>
      <ItemsLayout>{searchParams ? <Details /> : <></>}</ItemsLayout>
    </>
  );
};

export default CurrentPage;
