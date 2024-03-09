import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: 1,
      name: "Ramprasad Chauhan",
      username: "ramprasadchauhan",
      userImg:
        "https://media.licdn.com/dms/image/D5603AQEbI4K4FjhQ9A/profile-displayphoto-shrink_800_800/0/1707203530522?e=1715212800&v=beta&t=piD66hgwL01Q8fyOC2TUMJZGG-1kLTv86dkMLg2PQIY",
      img: "https://images.unsplash.com/photo-1709771695454-bc187caca916?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D",
      text: "Nice view!",
      timestamp: "2 hourse ago",
    },

    {
      id: 2,
      name: "Ramprasad Chauhan",
      username: "ramprasadchauhan",
      userImg:
        "https://media.licdn.com/dms/image/D5603AQEbI4K4FjhQ9A/profile-displayphoto-shrink_800_800/0/1707203530522?e=1715212800&v=beta&t=piD66hgwL01Q8fyOC2TUMJZGG-1kLTv86dkMLg2PQIY",
      img: "https://images.unsplash.com/photo-1709220216434-f7f0f35ce533?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3M3x8fGVufDB8fHx8fA%3D%3D",
      text: "Great post!",
      timestamp: "2 hourse ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px]">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
