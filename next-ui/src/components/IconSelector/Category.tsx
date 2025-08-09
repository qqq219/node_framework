import * as React from 'react';
import CopyableIcon from './CopyableIcon';
import type { ThemeType } from './index';
import type { CategoriesKeys } from './fields';
import { useTranslations } from "next-intl"

interface CategoryProps {
  title: CategoriesKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: string[];
  onSelect: (type: string, name: string) => any;
}

const Category: React.FC<CategoryProps> = props => {

  const { icons, title, newIcons, theme } = props;
  const intl = useTranslations('Menu')
  const [justCopied, setJustCopied] = React.useState<string | null>(null);
  const copyId = React.useRef<NodeJS.Timeout | null>(null);
  const onSelect = React.useCallback((type: string, text: string) => {
    const { onSelect } = props;
    if (onSelect) {
      onSelect(type, text);
    }
    setJustCopied(type);
    copyId.current = setTimeout(() => {
      setJustCopied(null);
    }, 2000);
  }, []);
  React.useEffect(
    () => () => {
      if (copyId.current) {
        clearTimeout(copyId.current);
      }
    },
    [],
  );

  return (
    <div className='w-full mt-5'>
      <h4 className='text-[1rem] font-bold'>{intl('app-docs-components-icon-category-direction')}</h4>
      <ul className='text-2xl w-full gap-2 p-1'>
        {icons.map(name => (
          <div className='w-fit h-fit cursor-pointer hover:text-color-primary duration-300 text-color-subprimary inline-block m-2'>
            <CopyableIcon
              key={name}
              name={name}
              theme={theme}
              isNew={newIcons.includes(name)}
              justCopied={justCopied}
              onSelect={onSelect}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Category;
