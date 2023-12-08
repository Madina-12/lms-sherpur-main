import Image from "next/image";

const Logo = () => {
    return ( 
        <Image
            width={130}
            height={30}
            alt="logo"
            src="/logo.svg"
            className="border rounded-md bg-sky-100 border-sky-400 p-2"
        />
     );
}
 
export default Logo;