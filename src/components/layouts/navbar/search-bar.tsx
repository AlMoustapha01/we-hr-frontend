import { SearchIcon } from "@/components/icons/search-icon";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function SearchBar() {
  return (
    <InputGroup className="py-5 bg-stone-100 max-w-xs rounded-xs">
      <InputGroupInput placeholder="Search..." />

      <InputGroupAddon align="inline-end">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
