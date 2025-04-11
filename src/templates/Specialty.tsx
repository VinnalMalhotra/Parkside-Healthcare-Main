{
  /* Imports */
}

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";

import PageLayout from "../components/pageLayout";
import { Address, Image } from "@yext/pages-components";
import { IoWarningOutline } from "react-icons/io5";
import Cta from "../components/cta";
import ResponseComponent from "../components/ResponseComponent";
import RelatedData from "../components/relatedData";
import { format_date } from "../utils/reusableFunctions";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import BreadCrumbs from "../components/breadCrumbs";
import ScrollToTop from "../components/scrollToTop";
import AnnouncementBanner from "../components/AnnouncementComponent/Announcement";
import Blogs from "../components/relatedSections/Blogs";
import { format_phone, getRandomObjects } from "../utils/reusableFunctions";
import { useState } from "react";

{
  /* Stream Configuration */
}

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-ha-product",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "richTextDescriptionV2",
      "primaryPhoto",
      "c_primaryCTA",
      "c_secondaryCTA",
      "c_relatedProfessionals.name",
      "c_relatedProfessionals.address",
      "c_relatedProfessionals.c_medicalProfessionalType",
      "c_relatedProfessionals.mainPhone",
      "c_relatedProfessionals.emails",
      "c_relatedProfessionals.headshot",
      "c_relatedLocations.name",
      "c_relatedLocations.address",

      "c_relatedBlogs.name",
      "c_relatedBlogs.shortDescriptionV2",
      "c_relatedBlogs.primaryPhoto",
      "taxonomy_relatedConditions.name",
      "taxonomy_relatedConditions.slug",
      "taxonomy_relatedReasonsForVisit.name",
      "taxonomy_relatedReasonsForVisit.slug",
      "taxonomy_relatedProcedures.name",
      "taxonomy_relatedProcedures.slug",
    ],
    filter: {
      entityTypes: ["taxonomy_specialty"],
      savedFilterIds: ["1401364440"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

{
  /* Slug/URL Path */
}

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? `specialty/${document.slug}`
    : `${document.locale}/${document.address.region}/${document.address.city}/${document.address.line1}-${document.id.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

{
  /* Head Config */
}

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "HC | Specialty Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "richTextDescriptionV2",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

{
  /* Specialty Component */
}

const Specialty: Template<TemplateRenderProps> = ({ document }) => {
  const {
    __meta,
    _site,
    name,
    richTextDescriptionV2,
    primaryPhoto,
    meta,
    slug,
    c_relatedLocations,
    dm_directoryParents_hc_hf_directory,
    c_primaryCTA,
    c_secondaryCTA,
    c_relatedBlogs,
    c_relatedProfessionals,
    taxonomy_relatedReasonsForVisit,
    taxonomy_relatedProcedures,
    taxonomy_relatedConditions,
  } = document;

  const breadcrumbsData = [
    { id: "home", name: "Home", slug: "/" },
    { id: "specialties", name: "Specialties", slug: "/specialties" },
    {
      id: slug || "unknown-specialty",
      name: name || "Specialty",
      slug: slug ? `/specialty/${slug}` : "#",
    },
  ];

  interface RelatedBlog {
    name: string;
    primaryPhoto?: {
      url: string;
      alternateText?: string;
      height?: number;
      width?: number;
    };
    shortDescriptionV2?: string;
    primaryCTA?: {
      label: string;
      link: string;
    };
  }
  

  

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      {/* Announcement Bar */}
      {/* {closed && (
        <section className="w-full bg-tertiary">
          <article className="centered-container !py-0">
            <p className="flex text-base items-center h-20 md:h-14 my-auto text-white">
              <IoWarningOutline className="h-6 w-6 md:h-4 md:w-4 mr-4" />
              This location is temporarily closed due to inclement weather.
            </p>
          </article>
        </section>
      )} */}


      {/* <a href="slug">name</a> */}

      <AnnouncementBanner isVisibleByDefault={true} position="left" />

      {/* Breadcrumbs */}
      {/* <article className="centered-container !py-4 hidden md:block">
        <BreadCrumbs
          data={dm_directoryParents_hc_hf_directory}
          currAddress={address.line1}
        />
      </article> */}
      <section className="centered-container mt-px">
  <BreadCrumbs data={breadcrumbsData} currAddress={name} />
</section>
     

      {/*About Section */}
      <section className="centered-container">
        <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <article className="flex flex-col w-full md:w-1/2 gap-6 self-start">
            <h2 className="text-2xl md:text-4xl font-bold">About {name}</h2>
            

            <div className="mt-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row w-full">
              <button className="font-bold md:text-lg bg-secondary text-white w-full md:w-auto p-3 px-6 flex items-center justify-center border rounded-full">
                Schedule Appointment
              </button>
              <button className="border-2 font-bold text-secondary border-secondary md:text-lg w-full md:w-auto p-3 px-6 flex items-center justify-center rounded-full">
               Find a Specialist
              </button>
            </div>
          </article>

          {primaryPhoto && (
            <figure className="w-full md:w-1/2">
              <Image
                image={primaryPhoto}
                className="rounded-xl w-full max-h-[400px] object-cover"
                //alt={`Visual representation of ${name}`}
              />
            </figure>
          )}
        </section>
      </section>




      {/* Main Info Section */}
      <article
        className={` ${meta.entityType.id === "product" ? `bg-primary` : `bg-accent`}`}
      >
        <section
          className="centered-container flex gap-4 md:gap-8 flex-col md:flex-row justify-between text-left !space-y-0 !py-2 w-full md:!px-40"
          aria-labelledby="main-content-heading"
        >
          <aside className="w-full md:w-4/5 ml-0 !text-lg flex flex-col gap-4 rounded-xl">
            <header>
              <h2
                id="main-content-heading"
                className="text-2xl md:text-4xl font-bold "
              >
                {name}  
              </h2>
              <ResponseComponent response={richTextDescriptionV2} />
            </header>
            {/* <article className="text-lg space-y-2">
              <ResponseComponent
                response={c_shortDescriptionV2 || shortDescriptionV2}
              />
            </article> */}
          </aside>
        </section>
      </article>

  





      {/* What we Treat Section - Specialities
{taxonomy_relatedConditions && taxonomy_relatedConditions.length > 0 && (
  <section className="centered-container my-12">
    <h2 className="text-2xl md:text-4xl font-bold mb-6">What We Treat</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
      {taxonomy_relatedConditions
        .slice(0, 20) // 👈 Limit to total 20 specialties (10 per column)
        .map((condition: any, index: number) => (
          <a
            key={index}
            href={`/conditions/${condition.slug}`}
            className="text-gray-700 font-medium border-b-2 border-green-600 w-fit hover:opacity-80 transition duration-200"
          >
            {condition.name}
          </a>
        ))}
    </div>
  </section>
)} */}







{/* What we Treat Section - Specialities */}
{taxonomy_relatedConditions && taxonomy_relatedConditions.length > 0 && (
  <section className="centered-container my-12">
    <h2 className="text-2xl md:text-4xl font-bold mb-6">What We Treat</h2>

    {/* ⬇️ Hidden Full List Container with show/hide logic */}
    <div
      id="specialtiesList"
      className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 overflow-hidden max-h-[700px] transition-all duration-500 ease-in-out"
    >
      {taxonomy_relatedConditions.map((condition: any, index: number) => (
        <a
          key={index}
          href={`/conditions/${condition.slug}`}
          className="text-gray-700 font-medium border-b-2 border-green-600 w-fit hover:opacity-80 transition duration-200"
        >
          {condition.name}
        </a>
      ))}
    </div>

    {/* CTA Button */}
    <div className="text-center mt-6">
      <button
        onClick={() => {
          const el = document.getElementById("specialtiesList");
          el?.classList.toggle("max-h-[700px]");
          el?.classList.toggle("max-h-full");
        }}
        className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition"
      >
        Show More
      </button>
    </div>
  </section>
)}




{/* Treatments We Offer Section - Subspecialties */}
{taxonomy_relatedProcedures && taxonomy_relatedProcedures.length > 0 && (
  <section className="centered-container my-12">
    <h2 className="text-2xl md:text-4xl font-bold mb-6">Treatments We Offer</h2>

    {/* List container with limited height initially */}
    <div
      id="subspecialtiesList"
      className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 overflow-hidden max-h-[700px] transition-all duration-500 ease-in-out"
    >
      {taxonomy_relatedProcedures.map((procedure: any, index: number) => (
        <a
          key={index}
          href={`/procedures/${procedure.slug}`}
          className="text-gray-700 font-medium border-b-2 border-green-600 w-fit hover:opacity-80 transition duration-200"
        >
          {procedure.name}
        </a>
      ))}
    </div>

    {/* Show More Button */}
    <div className="text-center mt-6">
      <button
        onClick={() => {
          const el = document.getElementById("subspecialtiesList");
          el?.classList.toggle("max-h-[700px]");
          el?.classList.toggle("max-h-full");
        }}
        className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition"
      >
        Show More
      </button>
    </div>
    <div className="flex justify-center mt-8">
      <a
        href="/professionals"
        className="bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary/90"
      >
        Find More
      </a>
    </div>
  </section>
)}













      {/* Reasons to Visit Section */}

      {taxonomy_relatedReasonsForVisit && taxonomy_relatedReasonsForVisit.length > 0 && (
  <section className="centered-container my-12">
    <h2 className="text-2xl md:text-4xl font-bold mb-6">Reasons to Visit</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
      {taxonomy_relatedReasonsForVisit.map((reason: any, index: number) => (
        <a
          key={index}
          href={`/reasons-to-visit/${reason.slug}`}
          className="text-gray-700 font-medium border-b-2 border-green-600 w-fit hover:opacity-80 transition duration-200"
        >
          {reason.name}
        </a>
      ))}
    </div>
    <div className="flex justify-center mt-8">
      <a
        href="/professionals"
        className="bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary/90"
      >
        Find More
      </a>
    </div>
  </section>
)}










      {/* Conditions Specialists Section - Related HC Professionals */}
      {c_relatedProfessionals && c_relatedProfessionals.length > 0 && (
  <section className="centered-container my-12">
    <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">Condition Specialists</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {c_relatedProfessionals.map((prof: any, index: number) => (
        <article key={index} className="bg-white rounded-lg shadow-md flex flex-col justify-between">
          {/* Top Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              {/* Profile Photo */}
              {prof.headshot?.url ? (
                <img
                  src={prof.headshot.url}
                  alt={prof.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-200 rounded-full" />
              )}

              {/* Name & Title */}
              <div>
                <h3 className="font-bold text-lg">{prof.name || "First Last"}</h3>
                <p className="text-sm text-gray-600">
                  {prof.c_medicalProfessionalType || "Specialist"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 space-y-3">
            {/* Phone */}
            {prof.mainPhone && (
              <div className="flex items-center space-x-2 text-sm text-gray-800">
                <HiOutlinePhone className="text-secondary" />
                <span>{prof.mainPhone}</span>
              </div>
            )}

            {/* Email */}
            {prof.emails?.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-secondary">
                <HiOutlineMail />
                <a href={`mailto:${prof.emails[0]}`} className="underline font-bold">
                  {prof.emails[0]}
                </a>
              </div>
            )}

            {/* View Profile */}
            <div className="flex items-center space-x-2 text-sm text-secondary font-bold underline">
              <span>🌐</span>
              <a href={`/professionals/${prof.slug || "#"}`} className="hover:underline">
                Visit Profile
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Find More CTA */}
    <div className="flex justify-center mt-8">
      <a
        href="/professionals"
        className="bg-secondary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary/90"
      >
        Find More
      </a>
    </div>
  </section>
)}

      






















      {/* Related Locations Section */}

      {c_relatedLocations && c_relatedLocations.length > 0 && (
        <section className="bg-white py-10">
          <div className="centered-container">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                Related Locations
              </h2>
              <a
                href="/locations"
                className="font-bold md:text-lg bg-secondary text-white w-full md:w-auto p-3 px-6 flex items-center justify-center border rounded-full"
              >
                View All
              </a>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(c_relatedLocations as Location[]).map(
                (location: any, index: number) => (
                  <article
                    key={index}
                    className="bg-gray-50 rounded-lg shadow p-6 flex flex-col justify-between"
                  >
                    {/* Location Name */}
                    <h3 className="text-lg font-bold mb-2">{location.name}</h3>

                    {/* Address */}
                    {/* <p className="text-sm text-gray-700 mb-4">{location.address.line1}</p> */}
                    <Address
                      address={location.address}
                      lines={[["line1", "city", ",", "region", "postalCode"]]}
                    />

                    {/* <a
                      className="text-secondary text-base font-bold decoration-2 underline-offset-4  underline"
                      href={getDirections(address)}
                    >
                      Get Directions
                    </a>
                    <span className="flex gap-2 items-center">
                      <HiOutlinePhone className="h-4 w-4 text-secondary" />
                      <p>{format_phone(mainPhone)}</p>
                    </span> */}
                  </article>
                )
              )}
            </section>










            {/* 📚 Related Articles Section */}
{c_relatedBlogs && c_relatedBlogs.length > 0 && (
  <section className="bg-gray-100 py-10">
    <div className="centered-container">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Articles</h2>
        <a
          href="/blogs"
          className="font-bold md:text-lg bg-secondary text-white w-full md:w-auto p-3 px-6 flex items-center justify-center border rounded-full"
        >
          Find More
        </a>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(c_relatedBlogs as RelatedBlog[]).map((blog: RelatedBlog, index: number) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {blog.primaryPhoto?.url ? (
              
              <Image
              image={{
                url: blog.primaryPhoto?.url || "",
                alternateText: blog.primaryPhoto?.alternateText || blog.name,
                height: blog.primaryPhoto?.height || 200, // Fallback height
                width: blog.primaryPhoto?.width || 400,   // Fallback width
              }}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
                
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <h3 className="text-lg font-bold mb-2">{blog.name}</h3>

            <div className="text-sm text-gray-600 mb-4">
              <ResponseComponent
                response={
                  blog.shortDescriptionV2 ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                }
              />
            </div>

            <a
              href={blog.primaryCTA?.link || "#"}
              className="text-white bg-primary px-4 py-2 text-sm rounded-full w-fit self-start hover:bg-primary/90"
            >
              {blog.primaryCTA?.label || "Learn More"}
            </a>
          </article>
        ))}
      </section>
    </div>
  </section>
)}


















          </div>
        </section>
      )}
      <ScrollToTop />
    </PageLayout>
  );
};

export default Specialty;