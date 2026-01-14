import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { FavoriteCharactersProvider } from "@/context/FavoriteCharactersContext";
import { Character } from "@/services/types";

const character: Character = {
  id: 1,
  name: "Spider-Man",
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  image: { small_url: "/spiderman_test.jpg" },
  issues: [],
};

beforeEach(() => localStorage.clear());

describe("Favorites feature", () => {
  test("Adding character, it should update header counters by 1, add Spider-Man to localstorage and change button icon to HeartIconFilled", async () => {
    render(
      <FavoriteCharactersProvider>
        <Header />
        <FavoriteButton character={character} width={24} height={24} />
      </FavoriteCharactersProvider>
    );

    const button = screen.getByRole("button", { name: /Add to favorites/i });

    await userEvent.click(button);

    expect(await screen.findByText("1")).toBeInTheDocument();

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-pressed", "true");
      const stored = JSON.parse(localStorage.getItem("favoriteCharacters") || "[]");
      expect(stored).toHaveLength(1);
    });
  });

  test("Removing Spider-Man, remove it localStorage and changing Favorites button", async () => {
    render(
      <FavoriteCharactersProvider>
        <Header />
        <FavoriteButton character={character} width={24} height={24} />
      </FavoriteCharactersProvider>
    );

    const button = screen.getByRole("button", { name: /add to favorites/i });

    await userEvent.click(button);
    expect(await screen.findByText("1")).toBeInTheDocument();

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-pressed", "false");
      const stored = JSON.parse(localStorage.getItem("favoriteCharacters") || "[]");
      expect(stored).toHaveLength(0);
    });
  });
});
