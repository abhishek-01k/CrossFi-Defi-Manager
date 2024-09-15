import { siteConfig } from '@/config/site';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import { Icons } from './icons';

const SocialIcons = () => {
    return (
        <div className='flex flex-row gap-2 justify-center'>
            <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
            >
                <div
                    className={buttonVariants({
                        size: "icon",
                        variant: "ghost",
                    })}
                >
                    <Icons.twitter className="h-5 w-5 fill-current" />
                    <span className="sr-only">Twitter</span>
                </div>
            </Link>
            <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
            >
                <div
                    className={buttonVariants({
                        size: "icon",
                        variant: "ghost",
                    })}
                >
                    <Icons.gitHub className="h-5 w-5 fill-current" />
                    <span className="sr-only">Github</span>
                </div>
            </Link>
        </div>
    );
};

export default SocialIcons;