import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const BreadCrumb = ({ ...props }) => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      fontSize="sm"
      {...props}
    >
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <BreadcrumbItem key={index} isCurrentPage={isLast}>
            <BreadcrumbLink
              fontWeight={isLast ? 'semibold' : 'normal'}
              _hover={{
                textDecoration: isLast && 'none',
              }}
              textTransform="capitalize"
              as={RouterLink}
              to={isLast ? '#' : routeTo}
            >
              {pathname}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
