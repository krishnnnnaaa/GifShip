import { Code, Heart, Send, Twitter, Verified } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { FaWhatsapp } from "react-icons/fa";
import Suggestions from "./Suggestions";
import dataImage from "@/appwrite/image";

const GifCard = ({
  authorName = "Not Specified",
  isVerified,
  src = "Not Specified",
  authorDescription = "Not Specified",
  authorInstagram = "Not specified",
  authorWebsite = "Not Specified",
  date = "Not Specified",
  title = "Not Specified",
  width,
  height,
  gif,
  embed,
  id,
  slug,
  gifType,
  alt,
  responsiveHeight,
  responsiveWidth
}: {
  authorName: string;
  src: string;
  isVerified: boolean;
  authorDescription: string;
  authorInstagram: string;
  authorWebsite: string;
  date: string;
  title: string;
  width: string;
  height: string;
  gif: string;
  embed: string;
  id: string;
  slug: string;
  gifType: string;
  alt: string;
  responsiveWidth: number;
  responsiveHeight: number
}) => {
  let url = gif?.replace("media2", "i");
  if(url === gif){
    url = gif?.replace("media1", "i");
    if(url === gif){
      url = gif?.replace("media0", 'i')
    }
  } 

  const [toggleLike, setToggleLike] = useState(false)
  const handleFavouriteGif = ()=> {
    setToggleLike(!toggleLike)
  }
  useEffect(() => {
    if(toggleLike){      
      dataImage.saveImage({slug, url: gif, title, gifId: id, type: gifType, alt_text:alt, width:responsiveWidth, height: responsiveHeight})
      if(!toggleLike){
        dataImage.removeImage(id)
      }
    }
  }, [toggleLike])

  
  
  const handleShare = () => {
    if (navigator.share) {
      // Call the share function with content
      navigator
        .share({
          title: "Check this out!",
          text: `Here are some awesome content!`,
          url: url, // Link to your media
          // You can also share images on some mobile browsers
          // files: [new File([''], 'filename.jpg', { type: 'image/jpeg' })],
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex w-[85%] justify-center mx-auto space-x-5">
        <div className="text-center">
          <img
            className="m-2 rounded-lg"
            width={width}
            height={height}
            src={gif}
          />
          {src && (
            <span className="text-sm text-gray-600 italic">source: {src}</span>
          )}
        </div>
        <div className="flex flex-col mt-4 ">
          <div className="flex-col flex">
            <span>Title: {title}</span>
            <span className="flex items-center">
              Author: {authorName}
              {isVerified && (
                <span className="mx-1">
                  <Verified
                    className="text-white dark:text-black fill-blue-600"
                    size={20}
                  />
                </span>
              )}
            </span>
          </div>
          <div className="flex-col flex">
            <span>Decription: {authorDescription}</span>
            <span>Uploaded Date: {date}</span>
          </div>
          <div className="flex-col flex">
            <span>
              Instagram:{" "}
              <Link
                href={authorInstagram}
                target="_blank"
                className="text-blue-600"
              >
                {authorInstagram}
              </Link>
            </span>
            <span>
              Website:{" "}
              <Link
                href={authorWebsite}
                target="_blank"
                className="text-blue-600"
              >
                {authorWebsite}
              </Link>
            </span>
          </div>
          <div>
            <Separator orientation="horizontal" className="my-8" />
          </div>
          <div className="flex-col space-y-4 text-lg">
            <div onClick={handleFavouriteGif} className="flex cursor-pointer">
              <span className="flex">
                {
                  toggleLike ?
                  <Heart className="mr-4 fill-red-700 text-red-700" size={30} />
                  :
                  <Heart className="mr-4" size={30} />
                }
                Favourite
              </span>
            </div>
            <Dialog>
      <DialogTrigger asChild>
      <div className="flex cursor-pointer">
              <span className="flex">
                <Code className="mr-4" size={30} />
                Embed
              </span>
            </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Embed Gif</DialogTitle>
          <DialogDescription>
          Want to embed this Gif on your website or blog? Just drop in the embed code below and you're done!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="code" className="sr-only">
              Code
            </Label>
            <Input
              id="code"
              defaultValue={embed}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex cursor-pointer">
                  <span className="flex">
                    <Send className="mr-4" size={30} />
                    Share
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input id="link" defaultValue={url} readOnly />
                  </div>
                  <Button type="submit" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy />
                  </Button>
                </div>
                <div>
                  <div
                    onClick={handleShare}
                    className="flex space-x-4 py-2 my-2 border-2 border-gray-600 rounded-lg px-4 bg-white text-blue-600 font-semibold cursor-pointer"
                  >
                    <Twitter className="fill-blue-600 mx-2" size={20} /> Share
                    via Twitter
                  </div>
                  <div className="flex space-x-4 py-2 my-2 border-2 border-gray-600 rounded-lg px-4 bg-white text-green-600 font-semibold cursor-pointer">
                    <FaWhatsapp className="fill-green-600 mx-2" size={20} />{" "}
                    Share via Whatsapp
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="w-[90%] mx-auto my-4 h-[1px]"
      />
      <div>
        <Suggestions query={title} />
      </div>
    </div>
  );
};

export default GifCard;
