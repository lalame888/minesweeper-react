'use client';
import { Provider } from "react-redux";
import { store } from "@/redux";
import GameApp from "./GameApp";

export default function Home() {
  return (
    <Provider store={store}>
        <GameApp/>
    </Provider>
  );
}
