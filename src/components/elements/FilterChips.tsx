// Filter Chips Component
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterChipsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  className?: string;
}

export function FilterChips({ options, selected, onSelect, className }: FilterChipsProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2 scrollbar-hide', className)}>
      {options.map((option) => (
        <motion.button
          key={option}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
            selected === option
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}

// Category Toggle - Similar but with different styling
interface CategoryToggleProps {
  categories: { id: string; label: string; count?: number }[];
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function CategoryToggle({ categories, selected, onSelect, className }: CategoryToggleProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-secondary/50 rounded-xl', className)}>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(category.id)}
          className={cn(
            'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all relative',
            selected === category.id
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {category.label}
          {category.count !== undefined && (
            <span className={cn(
              'ml-1 text-xs',
              selected === category.id ? 'text-primary' : 'text-muted-foreground'
            )}>
              ({category.count})
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Sub Category Toggle with icons
interface SubCategoryToggleProps {
  items: { id: string; label: string; icon?: React.ReactNode }[];
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function SubCategoryToggle({ items, selected, onSelect, className }: SubCategoryToggleProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2', className)}>
      {items.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(item.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border',
            selected === item.id
              ? 'bg-primary-light border-primary/30 text-primary'
              : 'bg-card border-border text-muted-foreground hover:border-primary/20'
          )}
        >
          {item.icon}
          {item.label}
        </motion.button>
      ))}
    </div>
  );
}
