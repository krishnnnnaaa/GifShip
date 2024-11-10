import { Code, Heart, Send, Verified } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Copy } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from './ui/separator'

const GifCard = ({authorName, isVerified, authorDescription, authorInstagram='', authorWebsite='', date, title='Not Specified', width, height, gif}: {authorName:string, isVerified:boolean, authorDescription:string, authorInstagram:string, authorWebsite:string , date:string, title:string, width:string, height: string, gif: string}) => {
  return (
    <div>
        <div className='flex w-[85%] mx-auto space-x-5'>
            <div>
            <img
          className="m-2 rounded-lg"
          width={width}
          height={height}
          src={gif}
          />
            </div>
            <div className='flex flex-col mt-4'>
                <div className='flex-col flex'>
                    <span>Title: {title}</span>
                    <span className='flex items-center'>Author: {authorName}
                    {isVerified &&
                        <span className='mx-1'>
                <Verified className="text-white dark:text-black fill-blue-600" size={20} />
              </span>}
                    </span>
                </div>
                <div className='flex-col flex'>
                    <span>Decription: {authorDescription}</span>
                            <span>Uploaded Date: {date}</span>
                </div>
                <div className='flex-col flex'>
                    <span>Instagram: <Link href={authorInstagram} target='_blank' className='text-blue-600'>{authorInstagram}</Link></span>
                    <span>Website: <Link href={authorWebsite} target='_blank' className='text-blue-600'>{authorWebsite}</Link></span>
                </div>
            <div>
            <Separator orientation='horizontal' className='my-8'/>
            </div>
            <div className='flex-col space-y-4 text-lg'>
                <div className='flex'>
                    <span className='flex'>
                <Heart className='mr-4' size={30}/>
                Favourite
                    </span>
                </div>
                <div className='flex'>
                <span className='flex'>
                <Code className='mr-4' size={30}/>
                Embed
                    </span>
                </div>
                <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline"> */}
        <div className='flex cursor-pointer'>
                <span className='flex'>
                <Send className='mr-4' size={30}/>
                Share
                    </span>
                </div>
        {/* </Button> */}
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
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
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
            </div>
            </div>
        </div>
    </div>
  )
}

export default GifCard