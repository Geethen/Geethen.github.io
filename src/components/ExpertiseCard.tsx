import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ExpertiseCardProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
    index: number;
    linkTo?: string;
    isHighlighted?: boolean;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
    icon: Icon,
    title,
    subtitle,
    description,
    index,
    linkTo = '/research',
    isHighlighted = false,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setTilt({
            x: y * -10,
            y: x * 10,
        });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
    };

    if (isHighlighted) {
        return (
            <div
                ref={cardRef}
                className={`tilt-card group relative ${index === 1 ? 'md:-translate-y-4' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovered ? 'none' : 'transform 0.5s ease-out',
                }}
            >
                <div className="relative p-10 rounded-3xl bg-green-primary shadow-xl overflow-hidden h-full">
                    {/* Background glow */}
                    <div
                        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-green-accent/20 blur-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`}
                    />

                    {/* Icon */}
                    <div className="relative mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                        {/* Animated ring */}
                        <div className={`absolute inset-0 w-16 h-16 rounded-2xl border-2 border-white/20 transition-all duration-500 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
                    </div>

                    {/* Content */}
                    <div className="relative">
                        <p className="text-xs font-medium text-green-accent uppercase tracking-wider mb-2">
                            {subtitle}
                        </p>
                        <h3 className="font-serif text-2xl text-white font-bold mb-4">
                            {title}
                        </h3>
                        <p className="text-white/80 leading-relaxed text-lg mb-8">
                            {description}
                        </p>

                        {/* Learn more link */}
                        <Link
                            to={linkTo}
                            className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all group/btn"
                        >
                            Learn More
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent transform rotate-45 translate-x-12 -translate-y-12 transition-transform duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className={`tilt-card group relative`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isHovered ? 'none' : 'transform 0.5s ease-out',
            }}
        >
            <div className="relative p-10 rounded-3xl bg-white border border-gray-100 shadow-soft hover:shadow-soft-lg transition-shadow duration-500 overflow-hidden h-full">
                {/* Background glow */}
                <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-green-accent/10 blur-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Icon */}
                <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-primary to-green-accent flex items-center justify-center shadow-green group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Animated ring */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl border-2 border-green-accent/30 transition-all duration-500 ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
                </div>

                {/* Content */}
                <div className="relative">
                    <p className="text-xs font-medium text-green-accent uppercase tracking-wider mb-2">
                        {subtitle}
                    </p>
                    <h3 className="font-serif text-2xl text-green-dark font-semibold mb-3 group-hover:text-green-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-4">
                        {description}
                    </p>

                    {/* Learn more link */}
                    <Link
                        to={linkTo}
                        className="inline-flex items-center gap-1 text-sm font-medium text-green-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                        Explore
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-green-light/50 to-transparent transform rotate-45 translate-x-10 -translate-y-10 transition-transform duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />
                </div>
            </div>
        </div>
    );
};

export default ExpertiseCard;
