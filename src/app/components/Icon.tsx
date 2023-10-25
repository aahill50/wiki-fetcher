import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

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
