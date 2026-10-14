import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import type { ProductCategory } from '@/types/ProductCategory';

type Props = {
  category: ProductCategory;
  title: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  return (
    <>
      <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
        {title}
      </PageTitle>
    </>
  );
};
