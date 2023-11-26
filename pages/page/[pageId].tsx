import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ACCESS_KEY } from '../../API/constants';
import Details from '../../components/Details/Details';
import ItemsLayout from '../../components/Layouts/ItemsLayout/ItemsLayout';
import { ItemsResponse } from '../../interfaces/interfaces';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.params?.pageId;
  const searchQuery = context.query.search ? context.query.search : '';
  const limit = context.query.limit ? context.query.limit : '12';
  const detailsItemId = context.query.character ? context.query.character : '';
  const res = await fetch(
    `https://the-one-api.dev/v2/character/?name=%2F${searchQuery}%2Fi&page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${ACCESS_KEY}` },
    }
  );
  const data = await res.json();
  if (detailsItemId) {
    const resDetails = await fetch(`https://the-one-api.dev/v2/character/${detailsItemId}`, {
      headers: { Authorization: `Bearer ${ACCESS_KEY}` },
    });
    const dataDetails = await resDetails.json();
    return {
      props: { data, dataDetails },
    };
  }

  return {
    props: { data, dataDetails: '' },
  };
};

const CurrentPage = ({ data, dataDetails }: { data: ItemsResponse; dataDetails: ItemsResponse }): JSX.Element => {
  const router = useRouter();
  const searchParams = router.query['character'];

  return (
    <>
      <ItemsLayout data={data}>{searchParams ? <Details dataDetails={dataDetails} /> : <></>}</ItemsLayout>
    </>
  );
};

export default CurrentPage;
