import ApiItem from '../../interfaces/interfaces';

interface ItemProps {
  item: ApiItem;
  changeSearchParams: (character: string) => void;
}

export default ItemProps;
