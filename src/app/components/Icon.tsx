import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Props {
    alt: string;
    height: number;
    svg: StaticImport;
    width: number;
}

export default function Icon(props: Props) {
    const { alt, width, height, svg } = props;
    return <Image alt={alt} width={width} height={height} src={svg} />;
}
