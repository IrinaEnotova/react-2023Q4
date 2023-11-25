export default function Home(): JSX.Element {
  return <></>;
}

export async function getServerSideProps(): Promise<{ redirect: { destination: string; permanent: boolean } }> {
  return {
    redirect: {
      destination: '/page/1?search=&limit=12',
      permanent: false,
    },
  };
}
