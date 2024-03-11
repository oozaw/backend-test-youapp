import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  HeadersObject,
  LinksObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function ApiCustomResponse({
  status,
  schema,
  headers,
  isArray,
  links,
  type,
  description,
  dataProperties,
}: {
  status?: number;
  schema?: any;
  headers?: HeadersObject;
  isArray?: boolean;
  links?: LinksObject;
  type?: any;
  description?: string;
  dataProperties?: any;
}) {
  return applyDecorators(
    ApiResponse({
      status,
      schema,
      headers,
      isArray,
      links,
      type,
      description,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'boolean' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: dataProperties,
              },
            },
          },
        },
      },
    }),
  );
}
