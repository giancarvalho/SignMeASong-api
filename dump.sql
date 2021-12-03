CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" text NOT NULL,
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "upvotes" (
	"id" serial NOT NULL,
	"recommendation_id" integer NOT NULL,
	CONSTRAINT "upvotes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "downvotes" (
	"id" serial NOT NULL,
	"recommendation_id" integer NOT NULL,
	CONSTRAINT "downvotes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_fk0" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id") on DELETE CASCADE;

ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_fk0" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id") on DELETE CASCADE;



