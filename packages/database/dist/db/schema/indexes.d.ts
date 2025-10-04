export declare const userProfilesIndexes: {
    emailIdx: import("drizzle-orm/pg-core").IndexBuilder;
    ministryRoleIdx: import("drizzle-orm/pg-core").IndexBuilder;
    countryCodeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    subscriptionTierIdx: import("drizzle-orm/pg-core").IndexBuilder;
    accountStatusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const organizationsIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    organizationTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    accountOwnerIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const organizationMembershipsIndexes: {
    userIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    organizationIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    roleIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    joinedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const assessmentsIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    assessmentTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const assessmentQuestionsIndexes: {
    assessmentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    orderIndexIdx: import("drizzle-orm/pg-core").IndexBuilder;
    apestDimensionIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const userAssessmentsIndexes: {
    userIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    assessmentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    completedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    primaryGiftIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const assessmentResponsesIndexes: {
    userAssessmentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    questionIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const contentCategoriesIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    parentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    theologicalDisciplineIdx: import("drizzle-orm/pg-core").IndexBuilder;
    isActiveIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const contentSeriesIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    authorIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    seriesTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    visibilityIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    publishedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const contentItemsIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    authorIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    contentTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    primaryCategoryIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    seriesIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    visibilityIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    publishedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    viewCountIdx: import("drizzle-orm/pg-core").IndexBuilder;
    likeCountIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const seriesContentItemsIndexes: {
    seriesIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    contentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    orderIndexIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const contentCrossReferencesIndexes: {
    sourceContentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    targetContentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    referenceTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    relevanceScoreIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const communitiesIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    communityTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdByIdx: import("drizzle-orm/pg-core").IndexBuilder;
    visibilityIdx: import("drizzle-orm/pg-core").IndexBuilder;
    isActiveIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const communityMembershipsIndexes: {
    userIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    communityIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    roleIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    joinedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const communityPostsIndexes: {
    communityIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    authorIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    postTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    parentPostIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    upvotesIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const communityPostVotesIndexes: {
    postIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    userIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    voteTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const collaborationsIndexes: {
    leadAuthorIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    collaborationTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    startDateIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const subscriptionPlansIndexes: {
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    planTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    isActiveIdx: import("drizzle-orm/pg-core").IndexBuilder;
    sortOrderIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const userSubscriptionsIndexes: {
    userIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    planIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    leaderProfileIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    organizationIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    currentPeriodEndIdx: import("drizzle-orm/pg-core").IndexBuilder;
    stripeSubscriptionIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
export declare const allIndexes: {
    userIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    planIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    leaderProfileIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    organizationIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    statusIdx: import("drizzle-orm/pg-core").IndexBuilder;
    currentPeriodEndIdx: import("drizzle-orm/pg-core").IndexBuilder;
    stripeSubscriptionIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    slugIdx: import("drizzle-orm/pg-core").IndexBuilder;
    planTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    isActiveIdx: import("drizzle-orm/pg-core").IndexBuilder;
    sortOrderIdx: import("drizzle-orm/pg-core").IndexBuilder;
    leadAuthorIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    collaborationTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    startDateIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    postIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    voteTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    communityIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    authorIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    postTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    parentPostIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    upvotesIdx: import("drizzle-orm/pg-core").IndexBuilder;
    roleIdx: import("drizzle-orm/pg-core").IndexBuilder;
    joinedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    communityTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    createdByIdx: import("drizzle-orm/pg-core").IndexBuilder;
    visibilityIdx: import("drizzle-orm/pg-core").IndexBuilder;
    sourceContentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    targetContentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    referenceTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    relevanceScoreIdx: import("drizzle-orm/pg-core").IndexBuilder;
    seriesIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    contentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    orderIndexIdx: import("drizzle-orm/pg-core").IndexBuilder;
    contentTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    primaryCategoryIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    publishedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    viewCountIdx: import("drizzle-orm/pg-core").IndexBuilder;
    likeCountIdx: import("drizzle-orm/pg-core").IndexBuilder;
    seriesTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    parentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    theologicalDisciplineIdx: import("drizzle-orm/pg-core").IndexBuilder;
    userAssessmentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    questionIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    assessmentIdIdx: import("drizzle-orm/pg-core").IndexBuilder;
    completedAtIdx: import("drizzle-orm/pg-core").IndexBuilder;
    primaryGiftIdx: import("drizzle-orm/pg-core").IndexBuilder;
    apestDimensionIdx: import("drizzle-orm/pg-core").IndexBuilder;
    assessmentTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    organizationTypeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    accountOwnerIdx: import("drizzle-orm/pg-core").IndexBuilder;
    emailIdx: import("drizzle-orm/pg-core").IndexBuilder;
    ministryRoleIdx: import("drizzle-orm/pg-core").IndexBuilder;
    countryCodeIdx: import("drizzle-orm/pg-core").IndexBuilder;
    subscriptionTierIdx: import("drizzle-orm/pg-core").IndexBuilder;
    accountStatusIdx: import("drizzle-orm/pg-core").IndexBuilder;
};
//# sourceMappingURL=indexes.d.ts.map