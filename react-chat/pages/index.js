import Head from "next/head";
import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Chatbox</title>
      </Head>
      <main>
        <h1>Welcome to AI Chatbox</h1>
        <ChatBox />
      </main>
    </div>
  );
}
