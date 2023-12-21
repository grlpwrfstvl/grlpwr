import { PortableText } from "@portabletext/react";
import { getPage } from "../../../../sanity/sanity-utils";

type Props = { 
    params: { slug : string }
}

export default async function Page ({params}: Props) {
    const page = await getPage(params.slug);

    return (

        <div className="max-w-5xl mx-auto">
            <h1 className="pt-10 text-4xl text-gray-700 drop-shadow font-extrabold">
                {page.title}
            </h1> 

            <div className="">
                <PortableText value={page.content} />
            </div>
        </div>
    )
}