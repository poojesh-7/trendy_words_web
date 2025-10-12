"use client"
type WordProps = {
  trendy_word: string;
  alter_word: string;
  emoji:string;
  needMargin:boolean;
};

const emojis = ["🔥", "💎", "🌟", "🎯", "🚀", "🎉", "⚡", "💥", "😎"];

const WordCard = ({ trendy_word, alter_word,emoji,needMargin }: WordProps) => {
  const handleClick = () => {
    const query = encodeURIComponent(trendy_word);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };
  const index =
    trendy_word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    emojis.length;
  const emojiExtra = emojis[index];
  const val=needMargin?'ml-[10px] mt-[20px]':''
  return (
    <div className={`bg-cyan-200 min-w-[300px] ${val}  p-4 rounded-md w-fit justify-self-center 
    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110
    `}>
      <div className="flex items-center justify-between">
        <button className="cursor-pointer" onClick={handleClick}>
          <span className="bg-blue-300 px-2 py-1 font-bold text-lg hover:bg-green-400">
            {trendy_word}
          </span>
        </button>
        <span className="text-2xl">{!emoji?emojiExtra:emoji}</span>
      </div>
      <p className="mt-2 text-lg">
        Meaning : <span className="font-medium">{alter_word}</span>
      </p>
    </div>
  );
};

export default WordCard;
