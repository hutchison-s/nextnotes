import Logo from '../_lib/logo-square.png'
import Image from 'next/image';
interface LogoSize {
    size?: number
}
export default function LogoImage({size}: LogoSize) {
    return <Image src={Logo} alt='Next Notes Logo' width={size || 40} className='rounded-full border-[1px] border-dark-100'/>

}