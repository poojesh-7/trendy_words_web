import { AllWords } from "@/apis/words";
import UserWords from "@/components/main/UserWords";

export const metadata = {
  title: "Words | Trendy Vocabulary",
  description: "Explore all trendy words and their meanings — stay updated with modern language and slang!",
  keywords: ["trendy words", "slang", "modern vocabulary", "word list", "language trends"],
  openGraph: {
    title: "Words | Trendy Vocabulary",
    description: "Discover all trendy words and their alternate meanings in one place.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Words | Trendy Vocabulary",
    description: "Discover trendy words and their alternate meanings.",
  },
};

const WordsPage = async () => {
  const userwords = await AllWords();

  return (
    <div className="mt-[100px] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Trendy Words 😎</h1>
      <UserWords words={userwords} />
    </div>
  );
};

export default WordsPage;
