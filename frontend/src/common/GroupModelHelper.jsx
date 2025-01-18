import { ListGroupItem, Badge } from "react-bootstrap";

export const User = ({ user, onAddToCart }) => {
  return (
    <ListGroupItem as={"li"} key={user._id} onClick={() => onAddToCart(user)}>
      {user.name}
    </ListGroupItem>
  );
};



export const UserBadge = ({ user, onRemove }) => {
  return (
    <Badge
      pill
      bg="dark"
      onClick={(e) => onRemove(user)}
      className="py-2 px-3 border border-info border-5"
      role="button"
    >
      {user.name} &nbsp; ❌
    </Badge>
  );
};
