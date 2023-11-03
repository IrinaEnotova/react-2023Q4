import ApiItem from '../../interfaces/interfaces';

interface ItemListProps {
  items: ApiItem[];
  changeSearchParams: (characterId: string) => void;
}

export default ItemListProps;
