import { z } from 'zod';
export declare const apiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}>, any>[k]; } : never, z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}>[k_1]; } : never>;
export declare const apiErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodAny>;
    success: z.ZodLiteral<false>;
}, "strip", z.ZodTypeAny, {
    error: string;
    success: false;
    message?: string | undefined;
    details?: any;
}, {
    error: string;
    success: false;
    message?: string | undefined;
    details?: any;
}>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNext: z.ZodBoolean;
    hasPrev: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    limit: number;
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}, {
    limit: number;
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}>;
export declare const paginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<T, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: T["_output"][];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: T["_input"][];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: T["_output"][];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: T["_input"][];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userProfileResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const userProfileListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const organizationResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const organizationListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const organizationMembershipResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const organizationMembershipListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const assessmentApiResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const assessmentListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const assessmentQuestionResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const assessmentQuestionListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userAssessmentResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const userAssessmentListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const assessmentResponseResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const assessmentResponseListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const contentCategoryResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const contentCategoryListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const contentSeriesResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const contentSeriesListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const contentItemResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const contentItemListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const communityResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const communityListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const communityMembershipResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const communityMembershipListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const communityPostResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const communityPostListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const subscriptionPlanResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const subscriptionPlanListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userSubscriptionResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const userSubscriptionListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userAnalyticsEventResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const userAnalyticsEventListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userContentInteractionResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
}>;
export declare const userContentInteractionListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: any[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<z.ZodType<T>>>>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>>;
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
export type UserProfileListResponse = z.infer<typeof userProfileListResponseSchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationListResponse = z.infer<typeof organizationListResponseSchema>;
export type OrganizationMembershipResponse = z.infer<typeof organizationMembershipResponseSchema>;
export type OrganizationMembershipListResponse = z.infer<typeof organizationMembershipListResponseSchema>;
export type AssessmentApiResponse = z.infer<typeof assessmentApiResponseSchema>;
export type AssessmentListResponse = z.infer<typeof assessmentListResponseSchema>;
export type AssessmentQuestionResponse = z.infer<typeof assessmentQuestionResponseSchema>;
export type AssessmentQuestionListResponse = z.infer<typeof assessmentQuestionListResponseSchema>;
export type UserAssessmentResponse = z.infer<typeof userAssessmentResponseSchema>;
export type UserAssessmentListResponse = z.infer<typeof userAssessmentListResponseSchema>;
export type AssessmentResponseResponse = z.infer<typeof assessmentResponseResponseSchema>;
export type AssessmentResponseListResponse = z.infer<typeof assessmentResponseListResponseSchema>;
export type ContentCategoryResponse = z.infer<typeof contentCategoryResponseSchema>;
export type ContentCategoryListResponse = z.infer<typeof contentCategoryListResponseSchema>;
export type ContentSeriesResponse = z.infer<typeof contentSeriesResponseSchema>;
export type ContentSeriesListResponse = z.infer<typeof contentSeriesListResponseSchema>;
export type ContentItemResponse = z.infer<typeof contentItemResponseSchema>;
export type ContentItemListResponse = z.infer<typeof contentItemListResponseSchema>;
export type CommunityResponse = z.infer<typeof communityResponseSchema>;
export type CommunityListResponse = z.infer<typeof communityListResponseSchema>;
export type CommunityMembershipResponse = z.infer<typeof communityMembershipResponseSchema>;
export type CommunityMembershipListResponse = z.infer<typeof communityMembershipListResponseSchema>;
export type CommunityPostResponse = z.infer<typeof communityPostResponseSchema>;
export type CommunityPostListResponse = z.infer<typeof communityPostListResponseSchema>;
export type SubscriptionPlanResponse = z.infer<typeof subscriptionPlanResponseSchema>;
export type SubscriptionPlanListResponse = z.infer<typeof subscriptionPlanListResponseSchema>;
export type UserSubscriptionResponse = z.infer<typeof userSubscriptionResponseSchema>;
export type UserSubscriptionListResponse = z.infer<typeof userSubscriptionListResponseSchema>;
export type UserAnalyticsEventResponse = z.infer<typeof userAnalyticsEventResponseSchema>;
export type UserAnalyticsEventListResponse = z.infer<typeof userAnalyticsEventListResponseSchema>;
export type UserContentInteractionResponse = z.infer<typeof userContentInteractionResponseSchema>;
export type UserContentInteractionListResponse = z.infer<typeof userContentInteractionListResponseSchema>;
//# sourceMappingURL=api-responses.d.ts.map